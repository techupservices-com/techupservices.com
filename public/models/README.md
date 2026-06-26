Robot GLB contract

Place the true 3D robot head or bust here as:

robot-head.glb

Expected setup:
- Head centered at its neck pivot/origin.
- Face points toward positive Z in Blender/Three.js terms.
- Real-world scale is not required; the site scales the model.
- Materials should be embedded in the GLB.
- Keep the file web-sized when possible, ideally under 5 MB.

To activate this path, set `ROBOT_ASSET_MODE` to `"glb"` in `src/components/RobotCore.tsx`.
