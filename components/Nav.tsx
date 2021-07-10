import { FC } from "react";
import Link from "next/link";
import Divider from "../components/Divider";

const navLink = [
  {
    href: "/",
    component: (
      <a title="Overview" className="px-6 py-1 block hover:underline">
        Overview
      </a>
    ),
  },
  {
    href: "/transactions",
    component: (
      <a title="Transactions" className="px-6 py-1 block hover:underline">
        Transactions (3)
      </a>
    ),
  },
  {
    component: <Divider className="my-5" />,
  },
  {
    href: "#",
    component: (
      <a title="Transfers" className="px-6 py-1 block hover:underline">
        Transfers (2)
      </a>
    ),
  },
  {
    href: "#",
    component: (
      <a title="Invoices" className="px-6 py-1 block hover:underline">
        Invoices (1)
      </a>
    ),
  },
  {
    component: <Divider className="my-5" />,
  },
  {
    href: "#",
    component: (
      <a title="Manage cards" className="px-6 py-1 block hover:underline">
        Manage cards
      </a>
    ),
  },
  {
    href: "#",
    component: (
      <a title="Manage accounts" className="px-6 py-1 block hover:underline">
        Manage accounts
      </a>
    ),
  },
  {
    component: <Divider className="my-5" />,
  },
  {
    href: "#",
    component: (
      <a title="Team" className="px-6 py-1 block hover:underline">
        Team
      </a>
    ),
  },
  {
    href: "#",
    component: (
      <a title="Integrations" className="px-6 py-1 block hover:underline">
        Integrations
      </a>
    ),
  },
  {
    href: "#",
    component: (
      <a title="Settings" className="px-6 py-1 block hover:underline">
        Settings
      </a>
    ),
  },
  {
    href: "#",
    component: (
      <a title="Upgrade account" className="px-6 py-1 block hover:underline">
        Upgrade account
      </a>
    ),
  },
];

const Layout: FC = ({ children }) => {
  return (
    <div className="flex flex-row w-full">
      <div className="flex flex-col" style={{ backgroundColor: "#3e4750" }}>
        <Link href="/">
          <a
            title="HOME"
            className="h-16 flex justify-center items-center mb-5 font-bold"
            style={{ backgroundColor: "#363d45", color: "#fffefc" }}
          >
            FINPAL
          </a>
        </Link>
        <nav className="flex-1 overflow-auto">
          <ul style={{ color: "#838b95" }} className="text-sm">
            {navLink.map(({ href, component }, i) => {
              let renderComponent = component;
              if (href) {
                renderComponent = <Link href={href}>{component}</Link>;
              }
              return <li key={i}>{renderComponent}</li>;
            })}
          </ul>
        </nav>
      </div>
      <div className="flex flex-1 flex-col">
        <div className="h-16" style={{ backgroundColor: "#ecb02d" }}>
          <div className="h-full w-1/4 float-right" style={{ backgroundColor: "#f6f6f6" }} />
        </div>
        <section className="flex flex-1 overflow-auto">{children}</section>
      </div>
    </div>
  );
};

export default Layout;
