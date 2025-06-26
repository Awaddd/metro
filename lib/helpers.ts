// this function doesn't do much currently but it makes it clear
// that the action is meant to run in the background by design
export async function runInBackground(task: () => Promise<void>) {
  task().catch((e) =>
    console.error("Failed to execute background task, original error", e)
  );
}

export function capitaliseFirstLetter(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}
