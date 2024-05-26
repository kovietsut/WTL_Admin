import { Helmet } from 'react-helmet-async';
import { forwardRef, ReactNode, useEffect } from 'react';

interface Props {
  children: ReactNode;
  meta?: ReactNode;
  title: string;
}
const Page = forwardRef<HTMLDivElement, Props>(({ children, title = '', meta, ...other }, ref) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>{`${title} | SCWiki Dashboard`}</title>
        {meta}
      </Helmet>

      <div ref={ref} {...other}>
        {children}
      </div>
    </>
  );
});

export default Page;
