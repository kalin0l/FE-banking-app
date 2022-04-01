import { useSelector } from "react-redux";

const AllUsers = () => {
  const users = useSelector((state) => state.users.users);
  const user = useSelector((state) => state.form.user);

  return (
    <section className="all-users">
      <h4>Users</h4>
      <ul>
        {users && user &&
          users.map((onlineUser, i) => {
            return (
              <li key={i}>
                <span
                  className={`${user.name === onlineUser.name && "online"}`}
                ></span>
                {onlineUser.name}
              </li>
            );
          })}
      </ul>
    </section>
  );
};

export default AllUsers;
