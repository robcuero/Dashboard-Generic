import {
  Button,
  Card,
  Box,
  Grid,
  Typography,
  useTheme,
  styled,
  Avatar,
  Divider,
  alpha,
  ListItem,
  ListItemText,
  List,
  ListItemAvatar
} from '@mui/material';
import TrendingUp from '@mui/icons-material/TrendingUp';
import Text from 'src/components/Text';
import Chart from 'react-apexcharts';
import type { ApexOptions } from 'apexcharts';
import { useEffect, useState } from 'react';
import { sales, total } from 'src/services/clientService';

const AvatarSuccess = styled(Avatar)(
  ({ theme }) => `
      background-color: ${theme.colors.success.main};
      color: ${theme.palette.success.contrastText};
      width: ${theme.spacing(8)};
      height: ${theme.spacing(8)};
      box-shadow: ${theme.colors.shadows.success};
`
);

const ListItemAvatarWrapper = styled(ListItemAvatar)(
  ({ theme }) => `
  min-width: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: ${theme.spacing(1)};
  padding: ${theme.spacing(0.5)};
  border-radius: 60px;
  background: ${
    theme.palette.mode === 'dark'
      ? theme.colors.alpha.trueWhite[30]
      : alpha(theme.colors.alpha.black[100], 0.07)
  };

  img {
    background: ${theme.colors.alpha.trueWhite[100]};
    padding: ${theme.spacing(0.5)};
    display: block;
    border-radius: inherit;
    height: ${theme.spacing(4.5)};
    width: ${theme.spacing(4.5)};
  }
`
);

interface props {
  total: any;
  subtotal: any;
  month: any;
  chart: any;
  label: any;
}
export const AccountBalance: React.FC<props> = (
 { total,
  subtotal,
  month,
  chart,
  label}
) => {
  const theme = useTheme();

  const chartOptions: ApexOptions = {
    chart: {
      background: 'transparent',
      stacked: false,
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      pie: {
        donut: {
          size: '60%'
        }
      }
    },
    colors: ['#ff9900', '#1c81c2', '#6bc044', '#5c6ac0','#1c81c2', '#ff9900', '#6bc044', '#5c6ac0'],
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return Math.trunc(Number(val)) + '%';
      },
      style: {
        colors: [theme.colors.alpha.trueWhite[100]]
      },
      background: {
        enabled: true,
        foreColor: theme.colors.alpha.trueWhite[100],
        padding: 8,
        borderRadius: 4,
        borderWidth: 0,
        opacity: 0.3,
        dropShadow: {
          enabled: true,
          top: 1,
          left: 1,
          blur: 1,
          color: theme.colors.alpha.black[70],
          opacity: 0.5
        }
      },
      dropShadow: {
        enabled: true,
        top: 1,
        left: 1,
        blur: 1,
        color: theme.colors.alpha.black[50],
        opacity: 0.5
      }
    },
    fill: {
      opacity: 1
    },
    labels: label,
    legend: {
      labels: {
        colors: theme.colors.alpha.trueWhite[100]
      },
      show: false
    },
    stroke: {
      width: 0
    },
    theme: {
      mode: theme.palette.mode
    }
  };

  return (
    <Card>
      <Grid spacing={0} container>
        <Grid item xs={12} md={6}>
          <Box p={4}>
            <Typography
              sx={{
                pb: 3
              }}
              variant="h4"
            >
              Saldo de la cuentas
            </Typography>
            <Box>
              <Typography variant="h1" gutterBottom>
                ${total} Total
              </Typography>
              <Typography
                variant="h4"
                fontWeight="normal"
                color="text.secondary"
              >
                ${subtotal} Pendiente
              </Typography>
              <Box
                display="flex"
                sx={{
                  py: 4
                }}
                alignItems="center"
              >
                <AvatarSuccess
                  sx={{
                    mr: 2
                  }}
                  variant="rounded"
                >
                  <TrendingUp fontSize="large" />
                </AvatarSuccess>
                <Box>
                  <Typography variant="h4">+ ${month}</Typography>
                  <Typography variant="subtitle2" noWrap>
                    este mes
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Grid container spacing={3}>
              <Grid sm item>
                <Button fullWidth variant="outlined">
                  Enviar
                </Button>
              </Grid>
              <Grid sm item>
                <Button fullWidth variant="contained">
                  Imprimir
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid
          sx={{
            position: 'relative'
          }}
          display="flex"
          item
          xs={12}
          md={6}
        >
          <Divider absolute orientation="vertical" />
          <Box py={4} pr={4} flex={1}>
            <Typography
              sx={{
                pb: 3,
                ml: 3
              }}
              variant="h4"
            >
              Porcentajes por subtotal
            </Typography>
            <Grid container spacing={0}>
              <Grid
                xs={12}
                sm={12}
                item
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Chart
                  height={250}
                  options={chartOptions}
                  series={chart}
                  type="donut"
                />
              </Grid>
              {/* <Grid xs={12} sm={7} item display="flex" alignItems="center">
                <List
                  disablePadding
                  sx={{
                    width: '100%'
                  }}
                >
                  <ListItem disableGutters>
                    <ListItemAvatarWrapper>
                      <img
                        alt="BTC"
                        src="/static/images/placeholders/logo/bitcoin.png"
                      />
                    </ListItemAvatarWrapper>
                    <ListItemText
                      primary="BTC"
                      primaryTypographyProps={{ variant: 'h5', noWrap: true }}
                      secondary="Bitcoin"
                      secondaryTypographyProps={{
                        variant: 'subtitle2',
                        noWrap: true
                      }}
                    />
                    <Box>
                      <Typography align="right" variant="h4" noWrap>
                        20%
                      </Typography>
                      <Text color="success">+2.54%</Text>
                    </Box>
                  </ListItem>
                  <ListItem disableGutters>
                    <ListItemAvatarWrapper>
                      <img
                        alt="XRP"
                        src="/static/images/placeholders/logo/ripple.png"
                      />
                    </ListItemAvatarWrapper>
                    <ListItemText
                      primary="XRP"
                      primaryTypographyProps={{ variant: 'h5', noWrap: true }}
                      secondary="Ripple"
                      secondaryTypographyProps={{
                        variant: 'subtitle2',
                        noWrap: true
                      }}
                    />
                    <Box>
                      <Typography align="right" variant="h4" noWrap>
                        10%
                      </Typography>
                      <Text color="error">-1.22%</Text>
                    </Box>
                  </ListItem>
                  <ListItem disableGutters>
                    <ListItemAvatarWrapper>
                      <img
                        alt="ADA"
                        src="/static/images/placeholders/logo/cardano.png"
                      />
                    </ListItemAvatarWrapper>
                    <ListItemText
                      primary="ADA"
                      primaryTypographyProps={{ variant: 'h5', noWrap: true }}
                      secondary="Cardano"
                      secondaryTypographyProps={{
                        variant: 'subtitle2',
                        noWrap: true
                      }}
                    />
                    <Box>
                      <Typography align="right" variant="h4" noWrap>
                        40%
                      </Typography>
                      <Text color="success">+10.50%</Text>
                    </Box>
                  </ListItem>
                  <ListItem disableGutters>
                    <ListItemAvatarWrapper>
                      <img
                        alt="ETH"
                        src="/static/images/placeholders/logo/ethereum.png"
                      />
                    </ListItemAvatarWrapper>
                    <ListItemText
                      primary="ETH"
                      primaryTypographyProps={{ variant: 'h5', noWrap: true }}
                      secondary="Ethereum"
                      secondaryTypographyProps={{
                        variant: 'subtitle2',
                        noWrap: true
                      }}
                    />
                    <Box>
                      <Typography align="right" variant="h4" noWrap>
                        30%
                      </Typography>
                      <Text color="error">-12.38%</Text>
                    </Box>
                  </ListItem>
                </List>
              </Grid> */}
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
};

export default AccountBalance;
