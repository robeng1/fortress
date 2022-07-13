import BottomNav from "components/bottom-navigation"
import { SettingsCardNoIcon } from "components/blocks/settings-card"
import ThemeSettingsOverview from "components/templates/theme-settings"
import { useQueryClient } from "react-query"
import { useEffect } from "react"
import useShop from "hooks/use-shop"
import useWebApp from "hooks/use-shop-app"

const ThemeSettings = () => {
  useWebApp()
  const { shop } = useShop()
  const klient = useQueryClient()

  useEffect(() => {
    if (!!shop && !!shop?.shop_id && shop.shop_id !== "") {
      klient.prefetchQuery(["webapp", shop?.shop_id])
    }
  }, [shop?.shop_id])

  return (
    <>
      <ThemeSettingsOverview>
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
