import { Button, FormHelperText } from '@mui/material';
import { useCallback, useState } from 'react';
import { VisibilityOff, Visibility } from '@mui/icons-material';

import { MyCustomerChangePassword, MyCustomerUpdate } from '@commercetools/platform-sdk';
import { IUseRegistrationFormReturn } from '@/features/AuthorizationForms/RegistrationForm/data/RegistrationForm.interface';
import { ValidationInput } from '@/features/AuthorizationForms/components/ValidationInput/ValidationInput';
import { INPUTS } from '@/features/AuthorizationForms/data/AuthorizationForms.constants';
import checkEmail from '@/features/validation/emailValidation';
import styles from './UserProfile.module.scss';
import { Title } from '@/components/Title/Title';
import { ShowPasswordBtn } from '@/features/AuthorizationForms/components/ShowPasswordBtn/ShowPasswordBtn';
import { InputType } from '@/features/AuthorizationForms/components/ValidationInput/ValidationInput.enums';
import checkPassword from '@/features/validation/passwordValidation';
import { CURRENT_PASSWORD, EMAIL_LABEL, NEW_PASSWORD } from '@/features/UserProfile/UserProfile.constants';
import { eCommerceAPI } from '@/services/ECommerceAPI';

export default function CredentialPart({ data }: { data: IUseRegistrationFormReturn }): React.ReactNode {
  const [isChangeMode, setChangeMode] = useState(false);
  const [isChangePasswordMode, setChangePasswordMode] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const handleEditMode = useCallback(() => {
    setChangeMode((value) => !value);
  }, []);

  const handleClickSaveBtn = useCallback(async () => {
    try {
      const localToken = localStorage.getItem('Token');
      if (localToken !== '') {
        const userData: MyCustomerUpdate = {
          version: 24,
          actions: [
            {
              action: 'changeEmail',
              email: '123@22.by'
            }
          ]
        };
        const response = await eCommerceAPI.updateUser(localToken as string, userData);
        console.log(response);
      }
    } catch (error) {
      console.error('Error update user email:', error);
    }
  }, []);

  const handleClickCancelBtn = useCallback(() => {
    data.setInputsErrors((values) => ({
      ...values,
      [INPUTS.email.name]: ''
    }));
    setChangeMode((value) => !value);
  }, [data]);

  const handleChangePasswordMode = useCallback(() => {
    setChangePasswordMode((value) => !value);
  }, []);
  const handleCancelPasswordChange = useCallback(() => {
    data.setInputsErrors((values) => ({
      ...values,
      [INPUTS.password.name]: ''
    }));
    setChangePasswordMode((value) => !value);
  }, [data]);

  const handleClickSavePasswordBtn = useCallback(async () => {
    //  TODO save changes;
    try {
      const localToken = localStorage.getItem('Token');
      if (localToken !== '') {
        const userData: MyCustomerChangePassword = {
          version: 26,
          currentPassword: '@q)$+-#)n5O"XzO[',
          newPassword: '@q)$+-#)n5O"XzO[2'
        };
        const response = await eCommerceAPI.updateUserPassword(
          localToken as string,
          userData,
          '123@22.by',
          userData.newPassword
        );
        console.log(response);
      }
    } catch (error) {
      console.error('Error update user password:', error);
    }
    console.log(currentPassword);
    console.log(data.inputsValues[INPUTS.password.name]);
  }, [currentPassword, data.inputsValues]);

  const handleChangePassword = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    setCurrentPassword(e.target.value);
  }, []);

  return (
    <>
      <Title variant="h6" className={styles.title}>
        Credential information
      </Title>
      {!isChangeMode && (
        <Button variant="outlined" onClick={handleEditMode}>
          Edit
        </Button>
      )}
      <ValidationInput
        label={EMAIL_LABEL}
        name={INPUTS.email.name}
        onChange={data.handleOnChangeInput(checkEmail)}
        disabled={!isChangeMode}
        error={!!data.inputsErrors[INPUTS.email.name]}
        value={isChangeMode ? undefined : data.inputsValues[INPUTS.email.name]}
      >
        <FormHelperText error>
          {data.inputsErrors[INPUTS.email.name] && data.inputsErrors[INPUTS.email.name]}
        </FormHelperText>
      </ValidationInput>
      {isChangeMode && (
        <>
          <Button variant="outlined" disabled={!!data.inputsErrors[INPUTS.email.name]} onClick={handleClickSaveBtn}>
            Save
          </Button>
          <Button variant="outlined" onClick={handleClickCancelBtn}>
            Cancel
          </Button>
        </>
      )}
      {!isChangePasswordMode && (
        <Button variant="outlined" onClick={handleChangePasswordMode}>
          Change Password
        </Button>
      )}

      {isChangePasswordMode && (
        <>
          <ValidationInput
            type={showPassword ? InputType.TEXT : InputType.PASSWORD}
            label={CURRENT_PASSWORD}
            onChange={handleChangePassword}
            endAdornment={
              <ShowPasswordBtn setShowPassword={setShowPassword}>
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </ShowPasswordBtn>
            }
          >
            <div />
          </ValidationInput>
          <ValidationInput
            type={showNewPassword ? InputType.TEXT : InputType.PASSWORD}
            label={NEW_PASSWORD}
            name={INPUTS.password.name}
            onChange={data.handleOnChangeInput(checkPassword)}
            error={!!data.inputsErrors[INPUTS.password.name]}
            endAdornment={
              <ShowPasswordBtn setShowPassword={setShowNewPassword}>
                {showNewPassword ? <VisibilityOff /> : <Visibility />}
              </ShowPasswordBtn>
            }
          >
            <FormHelperText error>
              {data.inputsErrors[INPUTS.password.name] && data.inputsErrors[INPUTS.password.name]}
            </FormHelperText>
          </ValidationInput>
          <Button
            variant="outlined"
            disabled={currentPassword === '' ? true : !!data.inputsErrors[INPUTS.password.name]}
            onClick={handleClickSavePasswordBtn}
          >
            Save
          </Button>
          <Button variant="outlined" onClick={handleCancelPasswordChange}>
            Cancel
          </Button>
        </>
      )}
    </>
  );
}
