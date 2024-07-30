import ApplicationLogo from "../ApplicationLogo";

const Footer = () => {
  return (
    <div className="shrink-0 flex flex-col space-y-1 w-full max-w-[990px] mt-auto mx-auto text-sm py-2">
      <div className="flex gap-2 justify-center items-center">
        <ApplicationLogo height="18" width="20"/>
        <div>One note to replace them all</div>
      </div>
      <div className="text-center">Term's and Services</div>
    </div>
  );
};

export default Footer;
