Robot angle sprite contract

Place transparent PNG head renders here with these exact names:

- head-left-45.png
- head-left-30.png
- head-left-15.png
- head-front.png
- head-right-15.png
- head-right-30.png
- head-right-45.png

Expected setup:
- Same canvas size for every file.
- Transparent background.
- Head aligned to the same neck pivot across all frames.
- Use the same lighting and scale as the current robot image.

To activate this path, set `ROBOT_ASSET_MODE` to `"angles"` in `src/components/RobotCore.tsx`.
