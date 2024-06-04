// TODO Move to a separate component Alert

export enum Alerts {
  SUCCESS = 'success',
  ERROR = 'error'
}

export enum AlertsText {
  SUCCESS_TEXT = 'The user has been successfully created.',
  SUCCESS_TEXT_UPDATE_USER = 'The user has been successfully updated.',
  ERROR_UPDATE_USER = 'Something went wrong during the updating process and that they should try again later.',
  ERROR_EMAIL_TEXT = 'There is already an existing customer with the provided email.',
  ERROR_CONNECTION_TEXT = 'Something went wrong during the registration process and that they should try again later.'
}
