import type { Dictionary } from "@/content/dictionary";
import { profile } from "@/content/dictionary";

export const SiteFooter = ({ dict }: { dict: Dictionary }) => (
    <footer className="mt-auto border-t border-border py-10">
        <div className="shell flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-faint">
                © {new Date().getFullYear()} {profile.name}. {dict.footer.rights}
            </p>
            <p className="text-sm text-faint">{dict.footer.built}</p>
        </div>
    </footer>
);
