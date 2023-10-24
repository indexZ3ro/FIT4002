import { useNavigate } from "react-router-dom";

export default function TeamojiHeader() {
    const navigate = useNavigate();
    const navigateLanding = () => {
        navigate("/");
    };
    return (
        <div className="teamoji-header-container">
            <div className="teamoji-header" onClick={navigateLanding}>
                Teamoji
            </div>
        </div>
    );
}
