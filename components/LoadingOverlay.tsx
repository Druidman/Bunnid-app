import { LoadingOverlay } from "@mantine/core"


type LoadingParams = {
    loadingVisible:   boolean
}
export function Loading({loadingVisible} : LoadingParams){


    return <LoadingOverlay
        visible={loadingVisible}
        zIndex={1000}
        overlayProps={{ radius: 'sm', blur: 10, bg: "inherit" }}
        loaderProps={{ color: 'var(--accent)', type: 'bars', bg: "inherit" }}
    />
} 