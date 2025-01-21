import type { SxStyles } from '@/shared/types/types';
import { Stack } from '@mui/system';
import { Paper } from '@mui/material';
import { sxMixins } from '@/app/config/mui-theme/mixins';
import { useAlert } from '@/features/Alert/useScreenNotification';
import { BoldTypography } from '@/components/typography/BoldTypography';
import { ClickToClipboardPaper } from '@/components/boxes/ClickToClipboardPaper';
import { PROMOCODES } from '@/services/ecommerceApi';
import { AlertsText } from '@/shared/data/constants';
import { pulseAnimation } from '@/shared/data/mui-animations';

const sxStyles: SxStyles = {
  header: {
    p: 1.5,
    flex: 2,
    color: 'white',
    bgcolor: 'Alert.infoColor'
  },
  clipboard: {
    flex: 1,
    textAlign: 'center',
    color: 'Alert.warningColor',
    bgcolor: 'warning.light',
    animation: `${pulseAnimation} 5s infinite`,
    ...sxMixins.animation(),
    ...sxMixins.mediaHover({
      animation: `${pulseAnimation} 2s infinite`
    })
  }
};

export function SpecialSection(): React.ReactNode {
  const { showAlert } = useAlert();

  const handleOnCopy = () => {
    showAlert(AlertsText.CLIPBOARD_SUCCESS);
  };

  return (
    <Stack component="section" gap={2} direction={{ zero: 'column', tablet: 'row' }} alignItems={{ zero: 'stretch', table: 'center' }}>
      <Paper elevation={5} sx={sxStyles.header}>
        <BoldTypography>Our special offer:</BoldTypography>
      </Paper>
      <Stack direction="row" gap={2} flex={2}>
        {PROMOCODES.map((promocode) => (
          <ClickToClipboardPaper handleOnCopy={handleOnCopy} text={promocode} key={promocode} sx={sxStyles.clipboard} />
        ))}
      </Stack>
    </Stack>
  );
}
