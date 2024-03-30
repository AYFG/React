import PropTypes from "prop-types";
import Link from "next/link";
const AppLayout = ({ children }) => {
  return (
    <div>
      <Link href="/">노드버드</Link>
      <Link href="/profile">프로필</Link>
      <Link href="/signup">회원가입</Link>
      {children}
    </div>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
