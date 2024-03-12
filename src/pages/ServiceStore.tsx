// import CTA from '../components/CTA/CTA'
import GenreNav from "../components/Sidenav/GenreNav";
import StoreMain from "../components/Store/StoreMain";
// import { NavbarSimple } from '../components/Navbar/Navbar'

function ServiceStore({ searchValue }: { searchValue: string }) {
  return (
    <div className="bg-custom-radial-gradient z-10">
      <div className="w-full relative flex flex-col md:flex-row">
            <GenreNav />
            <StoreMain searchValue={searchValue}/>
      </div>
    </div>
  );
}

export default ServiceStore;
