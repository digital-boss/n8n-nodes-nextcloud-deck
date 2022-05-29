import {
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';


export class NextCloudDeckOAuth2Api implements ICredentialType {
	name = 'nextCloudDeckOAuth2Api';
	extends = [
		'oAuth2Api',
	];
	displayName = 'NextCloud Deck OAuth2 API';
	documentationUrl = 'nextCloud';
	properties: INodeProperties[] = [
		{
			displayName: 'Web DAV URL',
			name: 'webDavUrl',
			type: 'string',
			placeholder: 'https://nextcloud.example.com/remote.php/webdav',
			default: '',
		},
		{
			displayName: 'Authorization URL',
			name: 'authUrl',
			type: 'string',
			default: 'https://nextcloud.example.com/apps/oauth2/authorize',
			required: true,
		},
		{
			displayName: 'Access Token URL',
			name: 'accessTokenUrl',
			type: 'string',
			default: 'https://nextcloud.example.com/apps/oauth2/api/v1/token',
			required: true,
		},
		{
			displayName: 'Scope',
			name: 'scope',
			type: 'hidden',
			default: '',
		},
		{
			displayName: 'Auth URI Query Parameters',
			name: 'authQueryParameters',
			type: 'hidden',
			default: '',
		},
		{
			displayName: 'Authentication',
			name: 'authentication',
			type: 'hidden',
			default: 'body',
		},
	];
}