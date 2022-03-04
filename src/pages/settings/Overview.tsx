import SettingsCard from "components/common/settings-card";
import { BanUser } from "components/icons/ban-user";
import { Bell } from "components/icons/bell";
import { MailIcon } from "components/icons/mail-icon";
import { MapPin } from "components/icons/map-pin";
import { DeliveryIcon } from "components/icons/delivery-icon";
import { CubeIcon } from "components/icons/shops/cube";
import { PriceWalletIcon } from "components/icons/shops/price-wallet";
import SettingsOverview from "components/templates/settings-overview";
import { NavbarIcon } from "components/icons/navbar-icon";
import { MyShopIcon } from "components/icons/sidebar";
import { OrderIcon } from "components/icons/order-icon";
import { TruckIcon } from "components/icons/truck-icon";
import { Revenue } from "components/icons/revenue";
import { Refund } from "components/icons/refund";

const SettingsIndex = () => {
  return (
    <SettingsOverview>
      <SettingsCard
        heading={'Store'}
        description={'Manage the your business details'}
        icon={<CubeIcon />}
        disabled={false}
        to={`/settings/account`}
      />
      <SettingsCard
        heading={'Payments'}
        description={'Manage your payout accounts'}
        icon={<PriceWalletIcon />}
        disabled={false}
        to={`/settings/payments`}
      />
      <SettingsCard
        heading={'Locations'}
        description={'Manage your business locations'}
        icon={<MapPin />}
        disabled={false}
        to={`/settings/locations`}
      />
      <SettingsCard
        heading={'Shipping'}
        description={'Manage your delivery fees & rates'}
        icon={<TruckIcon />}
        disabled={false}
        to={`/settings/shipping`}
      />
      <SettingsCard
        heading={'Legal'}
        description={'Manage business return & shipping policies'}
        icon={<BanUser />}
        disabled={false}
        to={`/settings/policies`}
      />
      <SettingsCard
        heading={'Domains'}
        description={'Manage business domains and urls'}
        icon={<NavbarIcon />}
        disabled={false}
        to={`/settings/domains`}
      />
      <SettingsCard
        heading={'Sales channels'}
        description={'Manage business sales channels'}
        icon={<Bell />}
        disabled={true}
        to={`/settings/sales-channels`}
      />
      <SettingsCard
        heading={'hello@reoplex.com'}
        description={'Can’t find the answers you’re looking for?'}
        icon={<MailIcon />}
        disabled={false}
        externalLink={'mailto: hello@reoplex.com'}
      />
      <SettingsCard
        heading={'Theme'}
        description={'Customize look and feel of your business'}
        icon={<MyShopIcon />}
        disabled={false}
        to={`/settings/theme`}
      />
      <SettingsCard
        heading={'Taxes'}
        description={'Manage sales tax for your business'}
        icon={<Refund />}
        disabled={true}
      />
    </SettingsOverview>
  );
};

export default SettingsIndex;
