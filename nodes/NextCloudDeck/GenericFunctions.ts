import { IExecuteFunctions, IHookFunctions } from 'n8n-core';
import { LoggerProxy, NodeApiError, NodeOperationError } from 'n8n-workflow';

import { OptionsWithUri } from 'request';

/**
 * Make an API request to NextCloud
 *
 * @param {IHookFunctions} this
 * @param {string} method
 * @param {string} url
 * @param {object} body
 * @returns {Promise<any>}
 */
export async function nextCloudDeckApiRequest(
  this: IHookFunctions | IExecuteFunctions,
  method: string,
  endpoint: string,
  body: object | string | Buffer,
  headers?: object,
  encoding?: null | undefined,
  query?: object
): Promise<any> {
  // tslint:disable-line:no-any
  const resource = this.getNodeParameter('resource', 0);
  const operation = this.getNodeParameter('operation', 0);

  const options: OptionsWithUri = {
    headers,
    method,
    body,
    qs: query ?? {},
    uri: '',
    json: false,
  };

  if (encoding === null) {
    options.encoding = null;
  }

  const authenticationMethod = this.getNodeParameter('authentication', 0);

  try {
    if (authenticationMethod === 'accessToken') {
      const credentials = await this.getCredentials('nextCloudApi');
      if (!credentials) return;

      options.auth = {
        user: credentials.user as string,
        pass: credentials.password as string,
      };

      options.uri = `${credentials.webDavUrl}/${encodeURI(endpoint)}`;

      if (resource === 'user' || operation === 'share') {
        options.uri = options.uri.replace('/remote.php/webdav', '');
      }
      return await this.helpers.request(options);
    } else {
      const credentials = await this.getCredentials('nextCloudOAuth2Api');
      if (!credentials) return;

      options.uri = `${credentials.webDavUrl}/${encodeURI(endpoint)}`;

      if (resource === 'user' && operation === 'create') {
        options.uri = options.uri.replace('/remote.php/webdav', '');
      }

      return await this.helpers.requestOAuth2!.call(this, 'nextCloudOAuth2Api', options);
    }
  } catch (error) {
    throw new NodeApiError(this.getNode(), error);
  }
}
