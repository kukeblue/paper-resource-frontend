declare module '*.css';
declare module '*.less';
declare module '*.png';
declare module '*.svg' {
  export function ReactComponent(
    props: React.SVGProps<SVGSVGElement>,
  ): React.ReactElement;
  const url: string;
  export default url;
}

interface ChResponse<T> {
  errorCode: string;
  errorMsg: string;
  list: T[];
  message: string;
  page: {};
  result: T;
  token: string;
  status: number;
}
