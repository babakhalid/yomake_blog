export const skyVertex = `
attribute vec2 uv;
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`

// A three-dimensional density field: view rays accumulate light through a
// cloud layer, with additional density samples toward the sun/moon for shadow.
// No photographs, image textures, or video are used.
export const skyFragment = `
precision highp float;
uniform vec2 uResolution;
uniform float uTime;
uniform float uNight;
uniform float uSteps;
varying vec2 vUv;

float hash(vec3 p) {
  p = fract(p * 0.3183099 + vec3(0.1, 0.2, 0.3));
  p *= 17.0;
  return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
}
float noise(vec3 p) {
  vec3 i = floor(p), f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(mix(hash(i), hash(i + vec3(1,0,0)), f.x),
        mix(hash(i + vec3(0,1,0)), hash(i + vec3(1,1,0)), f.x), f.y),
    mix(mix(hash(i + vec3(0,0,1)), hash(i + vec3(1,0,1)), f.x),
        mix(hash(i + vec3(0,1,1)), hash(i + vec3(1,1,1)), f.x), f.y), f.z);
}
float cloudDensity(vec3 p) {
  float height = (p.y - 2.8) / 3.6;
  float profile = smoothstep(0.0, 0.16, height) * (1.0 - smoothstep(0.5, 1.0, height));
  p.x += uTime * 0.065;
  p.z += uTime * 0.024;
  vec3 q = p * vec3(0.95, 1.15, 0.95);
  float shape = noise(q) * 0.53;
  q = q * 2.03 + vec3(7.1, 3.3, 5.8);
  shape += noise(q) * 0.27;
  q = q * 2.01 + vec3(1.7, uTime * 0.008, 9.2);
  shape += noise(q) * 0.13;
  shape += noise(q * 2.02) * 0.07;
  // Weather varies at a larger scale so individual cumulus masses have gaps.
  float weather = noise(vec3(p.x * 0.085, 0.7, p.z * 0.085));
  // A little more open blue sky in daylight keeps the cloud cover airy.
  float threshold = mix(0.47, 0.61, weather) + mix(0.018, 0.0, uNight);
  float body = shape - threshold - (1.0 - profile) * 0.3;
  return smoothstep(0.0, 0.12, body) * 1.4 * profile;
}

void main() {
  float aspect = uResolution.x / uResolution.y;
  vec2 screen = vUv * 2.0 - 1.0;
  vec3 ro = vec3(1.5, 0.5, -4.0);
  // Look directly up into the sky, keeping the original broad cloud backdrop
  // instead of stretching the clouds toward a low, receding horizon.
  vec3 rd = normalize(vec3(screen.x * aspect * 0.7, 1.2, screen.y * 0.65 + 0.6));
  vec3 lightDir = normalize(vec3(0.7, 0.65, 0.45));

  vec3 day = mix(vec3(0.77, 0.92, 1.0), vec3(0.34, 0.69, 0.97), pow(vUv.y, 0.7));
  vec2 sunUV = (vUv - vec2(0.82, 0.88)) * vec2(aspect, 1.0);
  day = mix(day, vec3(1.0, 0.98, 0.90), exp(-dot(sunUV, sunUV) * 5.0) * 0.12);
  vec3 night = mix(vec3(0.045, 0.080, 0.14), vec3(0.007, 0.018, 0.047), vUv.y);
  vec3 sky = mix(day, night, uNight);

  // Small stars and a moon remain behind the volume, so passing clouds occlude them.
  vec2 starGrid = vUv * vec2(aspect, 1.0) * 160.0;
  vec2 cell = floor(starGrid);
  float starSeed = hash(vec3(cell, 17.0));
  vec2 starPosition = vec2(hash(vec3(cell, 7.0)), hash(vec3(cell, 9.0)));
  float star = (1.0 - smoothstep(0.015, 0.09, length(fract(starGrid) - starPosition))) * step(0.988, starSeed);
  sky += star * vec3(0.65, 0.73, 0.85) * uNight;
  vec2 moonUV = (vUv - vec2(0.83, 0.79)) * vec2(aspect, 1.0);
  float moonDistance = length(moonUV);
  float moon = 1.0 - smoothstep(0.022, 0.024, moonDistance);
  float moonShade = smoothstep(-0.02, 0.023, moonUV.x + moonUV.y * 0.3);
  sky += vec3(0.52, 0.61, 0.72) * exp(-moonDistance * 22.0) * 0.1 * uNight;
  sky = mix(sky, vec3(0.82, 0.87, 0.91) * (0.3 + 0.7 * moonShade), moon * uNight);

  float start = (2.8 - ro.y) / rd.y;
  float end = min((6.4 - ro.y) / rd.y, 45.0);
  float stepSize = (end - start) / uSteps;
  float distance = start + hash(vec3(gl_FragCoord.xy, 1.0)) * stepSize;
  vec3 result = vec3(0.0);
  float transmission = 1.0;
  for (int i = 0; i < 48; i++) {
    if (float(i) >= uSteps || transmission < 0.015) break;
    vec3 p = ro + rd * distance;
    float density = cloudDensity(p);
    if (density > 0.005) {
      float shadow = cloudDensity(p + lightDir * 0.45) * 0.8;
      shadow += cloudDensity(p + lightDir * 1.1) * 1.0;
      float sunlight = exp(-shadow * 2.0);
      float heightLight = smoothstep(2.8, 6.4, p.y);
      // Bright skylight fills the undersides with pale blue-white; sunlight
      // shapes the billows gently without dark, storm-grey shadows.
      vec3 ambient = mix(vec3(0.87, 0.94, 0.99), vec3(0.96, 0.98, 1.0), heightLight);
      vec3 cloudDay = mix(ambient, vec3(1.0, 0.995, 0.98), sunlight * 0.8);
      vec3 cloudNight = mix(vec3(0.033, 0.053, 0.09), vec3(0.09, 0.13, 0.20), heightLight);
      cloudNight += vec3(0.28, 0.34, 0.43) * sunlight;
      vec3 cloud = mix(cloudDay, cloudNight, uNight);
      // Atmospheric haze softens distant cloud banks without flattening near ones.
      cloud = mix(cloud, sky, 1.0 - exp(-distance * mix(0.006, 0.013, uNight)));
      float opacity = 1.0 - exp(-density * stepSize * 2.4);
      result += transmission * opacity * cloud;
      transmission *= 1.0 - opacity;
    }
    distance += stepSize;
  }
  vec3 color = result + sky * transmission;
  color += (hash(vec3(gl_FragCoord.xy, 3.0)) - 0.5) / 255.0;
  gl_FragColor = vec4(color, 1.0);
}
`
