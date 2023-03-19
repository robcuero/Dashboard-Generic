import { useState, ChangeEvent, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Container, Tabs, Tab, Grid } from '@mui/material';
import Footer from 'src/components/Footer';
import { styled } from '@mui/material/styles';

import ActivityTab from './ActivityTab';
import EditProfileTab from './EditProfileTab';
import NotificationsTab from './NotificationsTab';
import SecurityTab from './SecurityTab';
import { getUserDetail } from 'src/services/clientService';
import { useDispatch, useSelector } from 'react-redux';
import { setAll } from 'src/store/slices/userDetail/formSlice';

const TabsWrapper = styled(Tabs)(
  () => `.MuiTabs-scrollableX {overflow-x: auto !important;}`
);

interface props {
  idUser: any;
}

const ManagementUserSettings: React.FC<props> = () => {
  const dispatch = useDispatch();
  const { userDetail, idSelect } = useSelector(
    (state: any) => state.userDetail
  );
  const [currentTab, setCurrentTab] = useState<string>('resume');

  useEffect(() => {
    getUserDetail(idSelect).then((res) => {
      dispatch(setAll(res));
    });
    // eslint-disable-next-line
  }, []);

  const tabs = [
    { value: 'resume', label: 'Resumen' },
    { value: 'editProfile', label: 'Editar' },
    { value: 'bill', label: 'Facturas' },
    { value: 'subs', label: 'Suscripciones' }
  ];

  const handleTabsChange = (event: ChangeEvent<{}>, value: string): void => {
    setCurrentTab(value);
  };

  return (
    <>
      <Helmet>
        <title>Detalle de Usuario - Applications</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <TabsWrapper
              onChange={handleTabsChange}
              value={currentTab}
              variant="fullWidth"
              scrollButtons="auto"
              textColor="primary"
              indicatorColor="primary"
            >
              {tabs.map((tab) => (
                <Tab key={tab.value} label={tab.label} value={tab.value} />
              ))}
            </TabsWrapper>
          </Grid>
          {userDetail.cliente !== null ? (
            <Grid item xs={12}>
              {currentTab === 'resume' && (<ActivityTab resume={userDetail} />)}
              {currentTab === 'editProfile' && <EditProfileTab user={userDetail}/>}
              {currentTab === 'bill' && <NotificationsTab />}
              {currentTab === 'subs' && <SecurityTab user={userDetail} />}
            </Grid>
          ) : (
            ''
          )}
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default ManagementUserSettings;
