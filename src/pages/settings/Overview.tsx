import SettingsCard from "components/common/settings-card";
import Sidebar from 'partials/Sidebar';
import Header from 'partials/Header';
import { BanUser } from "components/icons/ban-user";
import { Bell } from "components/icons/bell";
import { MailIcon } from "components/icons/mail-icon";
import { MapPin } from "components/icons/map-pin";
import { CubeIcon } from "components/icons/shops/cube";
import { PriceWalletIcon } from "components/icons/shops/price-wallet";
import { SiteSettingsIcon } from "components/icons/site-settings-icon";
import SettingsOverview from "components/templates/settings-overview";
import { SidebarCategoryIcon } from "components/icons/sidebar-category-icon";
import { NavbarIcon } from "components/icons/navbar-icon";
import { UploadIcon } from "components/icons/upload-icon";
import { Restaurant } from "components/icons/type";
import { Tools } from "components/icons/category";
import { MyShopIcon } from "components/icons/sidebar";

const SettingsIndex = () => {
  return (
    <SettingsOverview>
      <SettingsCard
        heading={'Store Details'}
        description={'Manage the your business details'}
        icon={<CubeIcon />}
        disabled={false}
        to={`/settings/account`}
      />
      <SettingsCard
        heading={'Payments & Accounts'}
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
      />
    </SettingsOverview>
  );
};

export default SettingsIndex;
