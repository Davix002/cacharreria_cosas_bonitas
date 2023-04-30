import Imagen from "../assets/imagen_principal.png";

const Imagen_principal = () => {
  return (
    <div className="flex-grow ">
          <div className="h-full w-full relative">
            <img
              src={Imagen}
              className="absolute top-0 left-0 h-full w-full object-cover z-0"
              alt="Imagen principal"
            />
          </div>
    </div>
  )
}

export default Imagen_principal