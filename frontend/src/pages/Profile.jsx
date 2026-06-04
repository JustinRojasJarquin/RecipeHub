import { useAuth } from "../hooks/useAuth";

function Profile() {

  const { user } = useAuth();

  return (
    <div className="p-10">

      <h1 className="text-3xl font-bold">
        Perfil
      </h1>

      <p>
        Nombre: {user?.name}
      </p>

      <p>
        Correo: {user?.email}
      </p>

    </div>
  );
}

export default Profile;