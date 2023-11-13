

const Banner = () => {

  return (
    <div>
      <div className="relative grid w-full flex-col items-end justify-center overflow-hidden rounded-xl bg-white bg-clip-border text-center text-gray-700">
        <div className="absolute inset-0 m-0 h-full w-full overflow-hidden rounded-none bg-transparent bg-[url('https://i.ibb.co/WDV311W/Banner-Image.jpg')] bg-cover bg-clip-border bg-center text-gray-700 shadow-none">
          <div className="absolute inset-0 w-full h-full bg-gradient-to-l from-primary to-secondary opacity-[0.8]"></div>
        </div>
        <div className="relative p-6 px-6 py-14 md:px-12">
          <p className="text-white font-bold">Welcome To The</p>
          <h2 className="mb-6 block font-sans text-4xl font-medium leading-[1.5] tracking-normal text-white antialiased">
            Awesome Online Marketplace
          </h2>
          <h5 className="block mb-4 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-white">
            Explore from thousands of qualityful jobs.
          </h5>
          <img
            alt="tania andrew"
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1480&amp;q=80"
            className="relative inline-block h-[74px] w-[74px] rounded-full border-2 border-white object-cover object-center"
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
