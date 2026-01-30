/**
 * FREEMIUM LIMIT CONSTANTS
 * Configuration for usage limits and messaging
 */

export const FREEMIUM_CONFIG = {
  // Usage limits
  FREE_DAILY_LIMIT: 3,
  FREE_WINDOW_HOURS: 24,
  
  // Premium tiers (future expansion)
  PREMIUM_DURATION_DAYS: 365,
  
  // Messages
  LIMIT_REACHED_MESSAGE: `Your today's trial has ended.
Come back after 24 hours to freely use the bot,
or upgrade to premium to access unlimited services.`,
  
  UPGRADE_PROMPT: `*Upgrade to Premium*

Remove the 3-analysis daily limit and access unlimited macro insights.

Payment is handled securely through Telegram Stars.`,
  
  PREMIUM_ACTIVATED_MESSAGE: `✅ Premium activated. You now have unlimited access to macro analysis.`,
  
  PREMIUM_EXPIRED_MESSAGE: `Your premium subscription has expired. Would you like to renew?`
};

/**
 * Get remaining time until limit resets
 */
export function getTimeUntilReset(userUsage, windowHours = 24) {
  if (!userUsage || userUsage.length === 0) {
    return null;
  }
  
  // Find oldest usage in current window
  const now = Date.now();
  const windowMs = windowHours * 60 * 60 * 1000;
  
  const inWindow = userUsage.filter(u => now - u.timestamp < windowMs);
  
  if (inWindow.length === 0) {
    return null;
  }
  
  // Time until oldest entry expires from window
  const oldest = Math.min(...inWindow.map(u => u.timestamp));
  const resetTime = oldest + windowMs;
  const remainingMs = resetTime - now;
  
  if (remainingMs <= 0) {
    return null;
  }
  
  // Format as human-readable time
  return formatDuration(remainingMs);
}

/**
 * Format duration in human-readable form
 */
function formatDuration(ms) {
  const hours = Math.floor(ms / (60 * 60 * 1000));
  const minutes = Math.floor((ms % (60 * 60 * 1000)) / (60 * 1000));
  
  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  } else {
    return `${minutes}m`;
  }
}
