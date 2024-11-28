import Explore from "../../components/business/explore";
import Header from "../../components/layouts/header";
import { RouteNames } from "../../constant/routes";

function ExplorePage() {
  return (
    <div>
      <Header title="Login" link={RouteNames.REGISTER} />
      <Explore />
    </div>
  );
}

export default ExplorePage;
