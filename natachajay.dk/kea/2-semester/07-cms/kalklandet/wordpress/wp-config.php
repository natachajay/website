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
define( 'DB_NAME', 'kalklandet' );

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
define( 'AUTH_KEY',         'Z%X3:CT=wGc[@:Os0Bevt:8PGKzx$(dL*zWx@im5/skv`0wtj,V6_fNMG/D?Y8vi' );
define( 'SECURE_AUTH_KEY',  ');+w&.QDr};Icz324Iq#k^^a7t ]K)e,FtjwHxO.m(A7?+Raa4Q!#KG4m{*v}XJu' );
define( 'LOGGED_IN_KEY',    '[rI*;n1}pO Truxn7PWgS(+^2&;m^#|d3VSsdEsUgItI~TFlaDX:M,L{N}pek:^;' );
define( 'NONCE_KEY',        'O:_FwHkU}5,x{j;$-e/D&/`gX/ewVLhokG`>/:m<Ur rm$!Zk9N_ FTSrdl}{^e!' );
define( 'AUTH_SALT',        'XQza#>5|m4?2r.j^.Q~!S:$h(>,Og9/ i*S;g?,x.$bu%M@8s,$e}:Fyh:>1p+Vy' );
define( 'SECURE_AUTH_SALT', 'N1aKDIRNQ8!^jw,|Jj|U56b6Lfd5mQ0$O*;~qeh&`7GR;1vmNpNg+b.V!xEdQmkq' );
define( 'LOGGED_IN_SALT',   'j:wQp:R2~ko~mJVjF!Swa.H6s+<=E0&,De=G&LId=N#C/kF9Q;8::b]g*xEg#H`6' );
define( 'NONCE_SALT',       'Z4xS{(hD|iR/nn6`V=3r}}SHltmKdVcD6jGKs.`|F3R6v}Wp4,>_^em{@ImN|egQ' );

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_kalklandet';

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

define( 'UPLOADS', 'wp-content/uploads' );

/** Sets up WordPress vars and included files. */
require_once( ABSPATH . 'wp-settings.php' );
