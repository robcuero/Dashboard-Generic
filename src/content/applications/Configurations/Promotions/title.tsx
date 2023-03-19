import { FC, useState } from 'react';
import PropTypes from 'prop-types';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { Typography, Button, Grid } from '@mui/material';
import { ModalCreatePro } from 'src/components/Modal/ModalCreatePro';

interface PageTitleProps {
  heading?: string;
  subHeading?: string;
  docs?: string;
  genericFunction() : any
}

const PageTitle: FC<PageTitleProps> = ({
  heading = '',
  subHeading = '',
  docs = '',
  genericFunction,
  ...rest
}) => {
  const [openModal, setOpenModal] = useState(false);

  const showModal = (value: boolean) => {
    setOpenModal(value);
  };
  return (
    <Grid
      container
      justifyContent="space-between"
      alignItems="center"
      {...rest}
    >
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          {heading}
        </Typography>
        <Typography variant="subtitle2">{subHeading}</Typography>
      </Grid>
      <ModalCreatePro showModal={showModal } value={openModal} genericFunction={genericFunction}/>
      <Grid item>
        <Button
          onClick={() => showModal(true)}
          sx={{ mt: { xs: 2, md: 0 } }}
          variant="contained"
          startIcon={<AddTwoToneIcon fontSize="small" />}
        >
          {'Nueva '}
          {heading}
        </Button>
      </Grid>
    </Grid>
  );
};

PageTitle.propTypes = {
  heading: PropTypes.string,
  subHeading: PropTypes.string,
  docs: PropTypes.string
};

export default PageTitle;
