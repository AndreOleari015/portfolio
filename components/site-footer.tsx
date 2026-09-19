import type { Dictionary } from "@/content/dictionary";
import { profile } from "@/content/dictionary";

export const SiteFooter = ({ dict }: { dict: Dictionary }) => (
    <footer className="mt-auto py-12">
        <div className="shell flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-mono text-xs text-faint">
                © {new Date().getFullYear()} {profile.name}. {dict.footer.rights}
            </p>
            <p className="font-mono text-xs text-faint">{dict.footer.built}</p>
        </div>
    </footer>
);
