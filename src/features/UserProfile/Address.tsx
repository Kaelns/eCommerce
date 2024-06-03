import { Button } from '@mui/material';
import { IUseRegistrationFormReturn } from '@/features/AuthorizationForms/RegistrationForm/data/RegistrationForm.interface';
import AddressSection from '@/features/AuthorizationForms/components/AddressSection/AddressSection';
import { INPUTS } from '@/features/AuthorizationForms/data/AuthorizationForms.constants';
import { AddressPrefix } from '@/features/AuthorizationForms/data/AuthorizationForms.enum';
import { checkAddressInputs } from '@/features/UserProfile/UserProfile.helpers';
import { IAddresses } from '@/features/UserProfile/UserProfile.interface';
import CheckboxBlock from '@/features/UserProfile/CheckboxBlock';

export default function Address({
  data,
  address,
  handleSave,
  handleCancel,
  handleToggleBilling,
  handleToggleShipping
}: {
  data: IUseRegistrationFormReturn;
  handleSave: () => void;
  handleCancel: () => void;
  handleToggleBilling: () => void;
  handleToggleShipping: () => void;
  address?: IAddresses;
}): React.ReactNode {
  return (
    <>
      <AddressSection
        onChangeComboBox={data.handleOnChangeComboBox}
        onChangeFunction={data.handleOnChangeInput}
        inputsErrors={data.inputsErrors}
        inputsValues={data.inputsValues}
        prefix={AddressPrefix.SHIPPING}
      />
      <CheckboxBlock
        address={address}
        disabled={false}
        data={data}
        handleToggleBilling={handleToggleBilling}
        handleToggleShipping={handleToggleShipping}
      />

      <Button
        variant="outlined"
        disabled={!checkAddressInputs(data.inputsValues, data.inputsErrors)}
        onClick={handleSave}
      >
        Save
      </Button>
      <Button variant="outlined" onClick={handleCancel}>
        Cancel
      </Button>
    </>
  );
}
