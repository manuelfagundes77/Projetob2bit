import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CampoInput from "../../components/campoInput";
import styles from "./profile.module.css";

interface UserProfile {
  name: string;
  email: string;
  profile_picture?: string;
}

const Profile: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          "https://api.homologation.cliqdrive.com.br/auth/profile/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json;version=v1_web",
              "Content-Type": "application/json",
            },
          }
        );

       
        const apiUser = res.data?.user || res.data;

        setUser({
          name: apiUser?.name || "",
          email: apiUser?.email || "",
          profile_picture: apiUser?.avatar?.high || "", 
        });

      } catch (err) {
        console.error("Erro ao buscar profile:", err);
        localStorage.removeItem("token"); // remove token inválido
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token, navigate]);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (loading) return <div>Carregando...</div>;
  if (!user) return null;

  return (
    <div className={styles.profileContainer}>
      <div className={styles.topBar}>
        <button className={styles.btnLogout} onClick={logout}>
          Logout
        </button>
      </div>

      <div className={styles.teste}>
        <div className={styles.profileBox}>
          <div className={styles.profilePic}>
            <span>Profile picture</span>
            <img
              src={user.profile_picture || undefined} // undefined evita erro se não tiver
              alt="Profile"
            />
            
          </div>

          <div className={styles.Campos}> 
              <div className={styles.campoForm}>
                <label htmlFor="name">Your <span>Name</span></label>
                <CampoInput id="name" type="text" value={user.name} readOnly />
              </div>

              <div className={styles.campoForm}>
                <label htmlFor="email">Your <span>E-mail</span></label>
                <CampoInput id="email" type="email" value={user.email} readOnly />
              </div>
          </div>

        </div>
      </div>

    </div>
  );
};

export default Profile;
