import { useContext } from "react";
import { Context } from "../../main";
import HowItWorks from "./HowItWorks";
import HeroSection from "./HeroSection";
import { Navigate } from "react-router-dom";
import PopularCompanies from "./PopularCompanies";
import PopularCategories from "./PopularCategories";

const Home = () => {
  const { isAuthorized } = useContext(Context);
  if (!isAuthorized) {
    return <Navigate to={"/login"} />;
  }

  return (
    <section className="homepage page">
      <HeroSection />
      <HowItWorks />
      <PopularCategories />
      <PopularCompanies />
    </section>
  );
};

export default Home;
