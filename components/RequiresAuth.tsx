import {useAuth} from "@elrond-giants/erd-react-hooks/dist/useAuth/useAccount";
import {useRouter} from "next/router";
import {useEffect} from "react";
import {authPath} from "../utils/routes";

export default function RequiresAuth({children}: { children: any }) {
    const {authenticated} = useAuth();
    const router = useRouter();
    useEffect(() => {
        if (authenticated) {
            return;
        }

        (async () => {
            await router.replace(authPath);
        })();
    }, [authenticated, router]);

    if (authenticated) {
        return <>{children}</>
    }
    return <><div className="d-flex justify-center"><div className="dot-pulse"></div></div></>
};
