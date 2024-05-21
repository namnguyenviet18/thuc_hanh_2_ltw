
import { Skeleton } from "@mui/material";

function LoadingPhoto() {
    return (
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "start", gap: "8px", marginBottom: "16px" }}>
            <Skeleton style={{ borderRadius: "10px" }} variant="rectangular" width={700} height={400} />
            <Skeleton style={{ borderRadius: "10px" }} variant="rectangular" width={700} height={15} />
            <Skeleton style={{ borderRadius: "10px" }} variant="rectangular" width={300} height={15} />
            <Skeleton style={{ borderRadius: "10px" }} variant="rectangular" width={700} height={60} />
        </div>
    );
}

export default LoadingPhoto;