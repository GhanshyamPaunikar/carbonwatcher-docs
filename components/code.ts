// Use String.raw to safely embed Python f-strings (which contain ${...})
// without JavaScript template literal interpolation firing.
export const r = String.raw;
