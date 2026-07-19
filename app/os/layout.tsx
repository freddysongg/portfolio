import './os.css';

interface OsLayoutProps {
  children: React.ReactNode;
}

export default function OsLayout({
  children,
}: Readonly<OsLayoutProps>): React.ReactElement {
  return <>{children}</>;
}
