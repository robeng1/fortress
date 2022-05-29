import BottomNav from "components/bottom-navigation"
import { SettingsCardNoIcon } from "components/blocks/settings-card"
import ThemeSettingsOverview from "components/templates/theme-settings"
import { Link } from "react-router-dom"

const ThemeSettings = () => {
  return (
    <>
      <ThemeSettingsOverview>
        <SettingsCardNoIcon
          heading={"Announcement bar"}
          description={"Edit announcement bar of your site"}
          disabled={false}
          to={`/settings/theme/announcement-bar`}
        />
        <SettingsCardNoIcon
          heading={"Banner 1"}
          description={"Edit the hero section of your site's home page"}
          disabled={false}
          to={`/settings/theme/hero`}
        />
        <SettingsCardNoIcon
          heading={"Banner 2"}
          description={"Edit the banner of your site's home page"}
          disabled={false}
          to={`/settings/theme/banner`}
        />
        <SettingsCardNoIcon
          heading={"Collection"}
          description={"Edit the collection section of your site's home page"}
          disabled={false}
          to={`/settings/theme/featured-collection`}
        />
        <SettingsCardNoIcon
          heading={"Footer"}
          description={"Edit footer your site"}
          disabled={false}
          to={`/settings/theme/footer`}
        />
      </ThemeSettingsOverview>
      <BottomNav />
    </>
  )
}

export default ThemeSettings
