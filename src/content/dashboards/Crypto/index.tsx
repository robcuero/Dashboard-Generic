import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Container, Grid } from '@mui/material';
import Footer from 'src/components/Footer';

import AccountBalance from './AccountBalance';
import Wallets from './Wallets';

import WatchList from './WatchList';
import { useEffect, useState } from 'react';
import { sales, total } from 'src/services/clientService';

function DashboardCrypto() {
  const [value, setValue] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [month, setMonth] = useState(0);
  const [chart, setChart] = useState([]);
  const [label, setLabel] = useState([]);
  const [sale, setSale] = useState<[]>([]);
  useEffect(() => {
    total().then((data) => {
      setValue(data[0].total);
      setSubtotal(data[0].subtotal);
      setMonth(data[0].mensual);
    });

    sales().then((data) => {
      setSale(data);
      data.forEach((element) => {
        setChart((chart) => [...chart, Number(element.subtotal)]);
        setLabel((label) => [...label, element.sector]);
      });
    });
  }, []);

  return (
    <>
      <Helmet>
        <title>Crypto Dashboard</title>
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
          spacing={4}
        >
          <Grid item xs={12}>
            <AccountBalance
              total={value}
              subtotal={subtotal}
              month={month}
              chart={chart}
              label={label}
            />
          </Grid>
          <Grid item lg={8} xs={12}>
            <Wallets datas={sale} />
          </Grid>

          <Grid item xs={12}>
            {/* <WatchList /> */}
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default DashboardCrypto;
