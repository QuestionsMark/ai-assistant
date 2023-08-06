import { NavLink } from "react-router-dom";
import { useUser } from "../../contexts/user.context";
import { Button } from "../common/Button";
import { fetchTool } from "../../utils/api.util";
import { usePromises } from "../../contexts/promises.context";

export const Nav = () => {
    const { setError } = usePromises();
    const { user, setUser } = useUser();

    const handleLogout = async () => {
        const response = await fetchTool<string>('auth/logout');
        if (!response.status) return setError(response.message);
        setUser(null);
    };

    return (
        <nav className="nav">
            <ul className="nav__list">
                {/* <li className="nav__item">
                    <NavLink to="/" className="nav__link">Home</NavLink>
                </li> */}
                {/* {user && <Nav.User />} */}
                {user ? <li className="nav__item">
                    <Button type="button" onClick={handleLogout} className="btn--nostyles nav__link">
                        Logout
                    </Button>
                </li> : <li className="nav__item">
                    <NavLink to="/login" className="nav__link">Login</NavLink>
                </li>}
            </ul>
        </nav>
    );
};

// Nav.User = () => {
//     return (
//         <>
//             <li className="nav__item">
//                 <NavLink to="/configurator-creator" className="nav__link">Create Configurator</NavLink>
//             </li>
//             <li className="nav__item">
//                 <NavLink to="/configurator" className="nav__link" end>My Configs</NavLink>
//             </li>
//             <li className="nav__item">
//                 <NavLink to="/upload" className="nav__link" end>Upload</NavLink>
//             </li>
//             <li className="nav__item">
//                 <NavLink to="/uploaded-images" className="nav__link" end>Uploaded Images</NavLink>
//             </li>
//         </>
//     );
// };