import { useState } from "react"

function ProfileCard({ users }) {

    const [currentIndex, setCurrentIndex] = useState(0);
    const user = users[currentIndex];
    const showPreviousUser = () => {
        setCurrentIndex((current) => (current === 0 ? users.length - 1 : current - 1))
    }

    const showNextUser = () => {
        setCurrentIndex((current) => (current === users.length - 1 ? 0 : current + 1))
    }

    const activeUser = users[currentIndex];

    return (
        <section className="profile-viewer">
            <button className="nav-button" type="button" onClick={showPreviousUser}>
                ←
            </button>

            <article className="profile-card" key={user.login.uuid}>
                <img
                    className="profile-image"
                    src={user.picture.large}
                    alt={`${user.name.first} ${user.name.last}`}
                />

                <div className="profile-content">
                    <h2>{`${user.name.first} ${user.name.last}`}</h2>
                    <p>{user.email}</p>
                    <p>{user.phone}</p>
                    <p>{`${user.location.city}, ${user.location.country}`}</p>
                    <p className="profile-count">
                        {currentIndex + 1} / {users.length}
                    </p>
                </div>
            </article>

            <button className="nav-button" type="button" onClick={showNextUser}>
                →
            </button>
        </section>
    );
}

export default ProfileCard;