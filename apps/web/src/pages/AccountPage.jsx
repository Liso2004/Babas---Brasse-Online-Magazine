import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAccount } from "../account/AccountContext.jsx";

export function AccountPage() {
  const { account, isLoggedIn, createProfile, signOut } = useAccount();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    createProfile({ name, email });
    navigate(searchParams.get("next") || "/people/visceral-contributor");
  }

  return (
    <section className="urban-account-page" data-page="account">
      <header className="urban-account-page__heading">
        <p className="urban-kicker">Syndicate access // profile</p>
        <h1>{isLoggedIn ? "Profile active." : "Create your profile."}</h1>
        <p>{isLoggedIn ? "Your profile is ready for dispatch and checkout." : "Create a local profile to continue to checkout and track your drops."}</p>
      </header>
      {isLoggedIn ? (
        <section className="urban-account-card">
          <span className="urban-account-card__status">● ONLINE</span>
          <h2>{account.name}</h2>
          <p>{account.email}</p>
          <div>
            <Link to="/checkout">Proceed to checkout</Link>
            <button type="button" onClick={signOut}>Sign out</button>
          </div>
        </section>
      ) : (
        <form className="urban-account-card urban-account-form" onSubmit={handleSubmit}>
          <label htmlFor="account-name">Name</label>
          <input id="account-name" value={name} onChange={(event) => setName(event.target.value)} required autoComplete="name" />
          <label htmlFor="account-email">Email</label>
          <input id="account-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required autoComplete="email" />
          <button type="submit">Create profile // continue</button>
        </form>
      )}
    </section>
  );
}
