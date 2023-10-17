const CarritoDeCompras = (props) => {
  return (
    <svg
      className="h-8 p-1 hover:text-romTurquoise-500 duration-200 svg-inline--fa fa-shopping-cart fa-w-18 fa-3x"
      aria-hidden="true"
      focusable="false"
      data-prefix="far"
      data-icon="shopping-cart"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 576 512"
      {...props}
    >
      <path
        fill="currentColor"
        d="M544 112h-88.2l-46.6-93.1C405.6 6.2 396.9 0 387.8 0H160.2c-9.1 0-17.8 6.2-20.4 18.9L93.8 112H5.3C2.4 112 0 114.4 0 117.3v19.1c0 3 2.4 5.6 5.3 5.8L71.8 144H512l66.9-1.8c2.9-.2 5.2-2.8 5.2-5.8v-19.1c0-2.9-2.3-5.3-5.2-5.9zM224 464c0 26.5 21.5 48 48 48s48-21.5 48-48H224zm256 0c0 26.5 21.5 48 48 48s48-21.5 48-48h-96zm32-384H64c-35.3 0-64 28.7-64 64v32c0 35.3 28.7 64 64 64h21.4l49.5 99.1c10.3 20.7 31.6 34.9 55.7 34.9h192c24.1 0 45.5-14.2 55.7-34.9l49.5-99.1H512c35.3 0 64-28.7 64-64v-32c0-35.3-28.7-64-64-64zM192 304c-44.2 0-80-35.8-80-80s35.8-80 80-80 80 35.8 80 80-35.8 80-80 80zm0-128c-26.5 0-48 21.5-48 48s21.5 48 48 48 48-21.5 48-48-21.5-48-48-48zm224 128c-26.5 0-48 21.5-48 48s21.5 48 48 48 48-21.5 48-48-21.5-48-48-48z"
        className=""
      ></path>
    </svg>
  );
};

export default CarritoDeCompras;
