import { FC } from "react";
import Link from "next/link";
import Divider from "../components/Divider";

const navLink = [
  {
    href: "/",
    component: "Overview",
  },
  {
    href: "/transactions",
    component: "Transactions",
  },
  {
    component: <Divider className="my-5" />,
  },
  {
    href: "#",
    component: "Transfers (2)",
  },
  {
    href: "#",
    component: "Invoices (1)",
  },
  {
    component: <Divider className="my-5" />,
  },
  {
    href: "#",
    component: "Manage cards",
  },
  {
    href: "#",
    component: "Manage accounts",
  },
  {
    component: <Divider className="my-5" />,
  },
  {
    href: "#",
    component: "Team",
  },
  {
    href: "#",
    component: "Integrations",
  },
  {
    href: "#",
    component: "Settings",
  },
  {
    component: (
      <div className="flex">
        <Link href="#">
          <a
            title="Upgrade account"
            style={{ borderColor: "#668691", color: "#668691" }}
            className="border px-2 py-1 m-auto inline-block mt-5 rounded-md"
          >
            Upgrade account
          </a>
        </Link>
      </div>
    ),
  },
];

/**
 * Layout navigation
 * 
 * define header, navigation and show pages
 */
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
                renderComponent = (
                  <Link href={href}>
                    <a
                      title={component as unknown as string}
                      className="px-6 py-1 block hover:underline"
                    >
                      {component}
                    </a>
                  </Link>
                );
              }
              return <li key={i}>{renderComponent}</li>;
            })}
          </ul>
        </nav>
      </div>
      <div className="flex flex-1 flex-col">
        <div className="h-16" style={{ backgroundColor: "#ecb02d" }}>
          <div
            className="h-full w-1/4 float-right"
            style={{ backgroundColor: "#f6f6f6" }}
          />
        </div>
        <section className="flex flex-1 overflow-auto">{children}</section>
      </div>
    </div>
  );
};

export default Layout;
