## Microphone Protection 1.1.1

Requires Unknown Core 0.8.3 and enabled Privacy Protection. Retains requested capture blocking and existing overlays when verification or its required voice protection is unavailable. Maintenance retries, and Core shows the persistent unverified state.

## Verified build

This attached package is byte-for-byte the build tested on one owner-controlled LG C4 running webOS 25. Independent checks verified 19 known LG service executable blocks, including acr2, and 11 detected ALSA capture-node blocks. A live process-read failure caused zero disable calls and left existing blocks intact. Its warning persisted and recovered after a real reboot. Multiple automatic maintenance cycles and eight declared module health checks passed. Backend/browser regression checks and standalone source rebuild checks passed.

Coverage is limited to the known service and detected capture paths. Early boot, proprietary driver paths, app tracking and complete network isolation are not certified covered. Other TV models and firmware are unverified.

## Upgrade order

Install/update Core 0.8.3 first, then Privacy Protection 1.1.1 and Microphone Protection 1.1.1. If an older release already quarantined the modules, clear the old recovery state using Disable and restore for Microphone Protection first, then Privacy Protection. Apply the updates, enable Privacy Protection before Microphone Protection, and verify the saved options and health. An unverified warning is not proof of protection.

Requires an already-rooted TV you own, independent recovery access and backups. Review root modules before enabling them. Use the attached module ZIP, not GitHub's automatic source-code archive. Check SHA256SUMS.txt. Retain MIT attribution and third-party notices.

SHA-256 (`microphone-protection-1.1.1.zip`): `9c2f241ef3dcd5c095538d4fb974387eff6398bfcca6b9440a170fcd987b4dd9`
