<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'teamtherapy' );

/** MySQL database username */
define( 'DB_USER', 'natacha' );

/** MySQL database password */
define( 'DB_PASSWORD', 'yankis2700' );

/** MySQL hostname */
define( 'DB_HOST', 'localhost' );

/** Database Charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The Database Collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         'd-0.)t#ep`e`UJh7HY%p,DA0p:[-q.u!$k=W.<PTJJWA`..L]E%(/L{H%O^!N=;F' );
define( 'SECURE_AUTH_KEY',  '[3_-%?~3<Kh;NXg vst:8r&_v{7~i{G10BMfLQs-l@zk(K_ym<A&Uf7i1n#Hu00*' );
define( 'LOGGED_IN_KEY',    'PYpd`},|xyYpVXx,=]E=.@ S=Nx!^g3=n`5 N#]]<fge$U=w)lTs}f7{I>!BLCF?' );
define( 'NONCE_KEY',        '@=r!Cv0{FW%Tm<bVcah)`wqG~<mG<IX6XaP1)0NlG.>ez)|t+IY[j2%9_Bdp;R X' );
define( 'AUTH_SALT',        '@}RV &N!k^99>f_{@)Lx`Ns>OcD]*~c+/X6mzQr]@]%x+zOa-Zo1=L2qY[&5XcX)' );
define( 'SECURE_AUTH_SALT', 'x~^vU{ /Kv*_dVFls!}B/E{]7!k76^j=GG8d~1=e1M)aVv<a/H_K)lx~P88~TfVc' );
define( 'LOGGED_IN_SALT',   'rcO8?K8*3sw8 ZZMHfmB~}hGsG)9%$q<,ai{Tb{i)c8^ho04Zx_3N]y]d|[2^]mH' );
define( 'NONCE_SALT',       'kU^C@W:L?MJ)OU}A1yi5[.#Nlx7C0F;dn40#-t.3kXhn Gw? =%go{ &CmJ>`R# ' );

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define( 'WP_DEBUG', false );

/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', dirname( __FILE__ ) . '/' );
}

/** Sets up WordPress vars and included files. */
require_once( ABSPATH . 'wp-settings.php' );
