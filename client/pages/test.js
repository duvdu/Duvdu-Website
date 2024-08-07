import SlickSlider from "../components/elements/SlickSlider";
import { useTranslation } from 'react-i18next';


export default function Home() {
    const { t } = useTranslation();
    return (
    <div>
      <h1>{t("My Slick Slider")}</h1>
      <SlickSlider />
    </div>
  );
}
