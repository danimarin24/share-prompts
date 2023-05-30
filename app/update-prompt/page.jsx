'use client';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';

import Form from '@components/Form';

const EditPrompt = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams.get('id');

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: '',
    tag: '',
  });

  useEffect(() => {
    const getPromptDetails = async () => {
      const response = await fetch(`/api/prompt/${promptId}`);
      const data = await response.json();

      setPost({
        prompt: data.prompt,
        tag: data.tag,
      });
    };

    if (promptId) getPromptDetails();
  }, [promptId]);

  const updatePrompt = async (e) => {
    e.preventDefault();

    const regexExpHashtag = /^#[a-zA-Z]+/;

    if (regexExpHashtag.test(post.tag)) {
      setSubmitting(true);

      if (!promptId) return toast.error('Prompt ID not found');

      try {
        const response = await fetch(`/api/prompt/${promptId}`, {
          method: 'PATCH',
          body: JSON.stringify({
            prompt: post.prompt,
            tag: post.tag,
          }),
        });

        if (response.ok) {
          router.push('/');
        }
      } catch (error) {
        console.error(error);
      } finally {
        setSubmitting(false);
      }
    } else {
      toast.error('Put a # at the beginning');
    }
  };

  return (
    <>
      <Form
        type='Edit'
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={updatePrompt}
      />
      <Toaster position='top-center' />
    </>
  );
};

export default EditPrompt;
