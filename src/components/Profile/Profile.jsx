import "./Profile.css";

function Profile(props) {
  const { userData, onLogout } = props;
  return (
    <main className="profile">
      <div className="profile__container">
        <h1 className="profile__title">
          Привет, {userData.name ? userData.name : "Пользователь"}!
        </h1>
        <div className="user-data">
          <div className="user-data__item user-data__item_name">
            <p className="user-data__title">Имя</p>
            <p className="user-data__text">
              {userData.name ? userData.name : "Пользователь"}
            </p>
          </div>
          <div className="user-data__item">
            <p className="user-data__title">E-mail</p>
            <p className="user-data__text">{userData.email}</p>
          </div>
        </div>
        <div className="profile__buttons">
          <button
            className="profile__button-item profile__button-item_edit"
            type="button"
            onClick={() => {}}
          >
            Редактировать
          </button>
          <button
            className="profile__button-item profile__button-item_exit"
            type="button"
            onClick={() => {
              onLogout();
            }}
          >
            Выйти из аккаунта
          </button>
        </div>
      </div>
    </main>
  );
}

export default Profile;
