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
import { useLocation } from 'react-router';
import { getUserDetail } from 'src/services/clientService';

const TabsWrapper = styled(Tabs)(
  () => `
    .MuiTabs-scrollableX {
      overflow-x: auto !important;
    }
`
);

interface props {
  idUser: any;
}
const ManagementUserSettings: React.FC<props> = ( ) => {
  const location = useLocation();
  const state: any = location.state;
  console.log(location.state)
  const [data, setData] = useState<any>(null);
  useEffect(() => {
    
    getUserDetail(state.idUser).then((res) => {
      setData(res);
    });
    // eslint-disable-next-line
  }, []);

  const [currentTab, setCurrentTab] = useState<string>('activity');
  const tabs = [
    { value: 'activity', label: 'Resumen' },
    { value: 'edit_profile', label: 'Editar' },
    { value: 'notifications', label: 'Suscripciones' },
    { value: 'security', label: 'Facturas' }
  ];

  const handleTabsChange = (event: ChangeEvent<{}>, value: string): void => {
    setCurrentTab(value);
  };

  return (
    <>
      <Helmet>
        <title>User Settings - Applications</title>
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
              variant="scrollable"
              scrollButtons="auto"
              textColor="primary"
              indicatorColor="primary"
            >
              {tabs.map((tab) => (
                <Tab key={tab.value} label={tab.label} value={tab.value} />
              ))}
            </TabsWrapper>
          </Grid>
          {data !== null && (
            <Grid item xs={12}>
              {currentTab === 'activity' && (
                <ActivityTab resume={data.cliente} />
              )}
              {currentTab === 'edit_profile' && <EditProfileTab />}
              {currentTab === 'notifications' && <NotificationsTab />}
              {currentTab === 'security' && <SecurityTab />}
            </Grid>
          )}
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default ManagementUserSettings;
