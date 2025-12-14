export const submitPipeline = async (pipeline) => {
  const res = await fetch('http://localhost:8000/pipelines/parse', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      pipeline: JSON.stringify(pipeline),
    }),
  });

  if (!res.ok) {
    throw new Error('Failed to submit pipeline');
  }

  return res.json();
};
