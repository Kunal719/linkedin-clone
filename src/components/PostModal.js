import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import Youtube from 'react-youtube';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { postArticleAPI } from '../actions';

const PostModal = (props) => {
  const [editorText, setEditorText] = useState('');
  const [shareImg, setShareImg] = useState('');
  const [videoURL, setVideoURL] = useState('');
  const [assetArea, setAssetArea] = useState('');

  const handleChange = (e) => {
    const image = e.target.files[0];
    console.log('yoo');

    if (image === '' || image === undefined) {
      alert(`Please upload a valid image, not a ${typeof image} file`);
      return;
    }

    setShareImg(image);
  };

  const switchAssetArea = (area) => {
    setShareImg('');
    setVideoURL('');
    setAssetArea(area);
  };

  const reset = (e) => {
    setEditorText('');
    setShareImg('');
    setVideoURL('');
    setAssetArea('');
    props.handleClick(e);
  };

  const postArticle = (e) => {
    console.log('Hello');
    e.preventDefault();
    if (e.target !== e.currentTarget) {
      return;
    }

    const payload = {
      image: shareImg,
      video: videoURL,
      user: props.user,
      description: editorText,
      timestamp: firebase.firestore.Timestamp.now(),
    };

    props.postArticle(payload);
    reset(e);
  };

  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      autoplay: 1,
    },
  };
  return (
    <>
      {props.showModal === 'open' && (
        <Container>
          <Content>
            <Header>
              <h2>Create Post</h2>
              <button onClick={(event) => reset(event)}>
                <img src='/images/close-icon.png' alt='' />
              </button>
            </Header>
            <SharedContent>
              <UserInfo>
                {props.user.photoURL ? (
                  <img src={props.user.photoURL} alt='' />
                ) : (
                  <img src='/images/user.svg' alt='' />
                )}
                <span>{props.user.displayName}</span>
              </UserInfo>
              <Editor>
                <textarea
                  value={editorText}
                  onChange={(e) => setEditorText(e.target.value)}
                  placeholder='What do you want to talk about?'
                  autoFocus={true}
                />
                {assetArea === 'image' ? (
                  <UploadImage>
                    <input
                      type='file'
                      accept='image/gif, image/jpeg, image/png'
                      name='image'
                      id='file'
                      style={{ display: 'none' }}
                      onChange={handleChange}
                    />
                    <p>
                      <label htmlFor='file'>Select an image</label>
                    </p>
                    {shareImg && (
                      <img src={URL.createObjectURL(shareImg)} alt='' />
                    )}
                  </UploadImage>
                ) : (
                  assetArea === 'media' && (
                    <>
                      <input
                        type='text'
                        placeholder='Enter video URL'
                        value={videoURL}
                        onChange={(e) => {
                          const urlParam = new URLSearchParams(
                            new URL(e.target.value).search
                          );
                          setVideoURL(urlParam.get('v'));
                        }}
                      />
                      {videoURL && <Youtube opts={opts} videoId={videoURL} />}
                    </>
                  )
                )}
              </Editor>
            </SharedContent>
            <SharedCreations>
              <AttachAssets>
                <AssetButton onClick={() => switchAssetArea('image')}>
                  <img src='/images/share-image.png' alt='' />
                </AssetButton>
                <AssetButton onClick={() => switchAssetArea('media')}>
                  <img src='/images/share-video.png' alt='' />
                </AssetButton>
              </AttachAssets>
              <ShareComment>
                <AssetButton>
                  <img src='/images/share-comment.png' alt='' />
                  Anyone
                </AssetButton>
              </ShareComment>
              <PostButton
                disabled={!editorText ? true : false}
                onClick={(event) => postArticle(event)}
              >
                Post
              </PostButton>
            </SharedCreations>
          </Content>
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 99999;
  color: black;
  background-color: rgba(0, 0, 0, 0.8);
  animation: fadeIn 0.3s;
`;

const Content = styled.div`
  width: 100%;
  max-width: 552px;
  background-color: white;
  max-height: 90%;
  overflow: initial;
  border-radius: 5px;
  position: relative;
  top: 32px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  padding: 16px 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  font-size: 16px;
  line-height: 1.5;
  justify-content: space-between;
  color: rgba(0, 0, 0, 0.6);
  font-weight: 400;
  align-items: center;

  button {
    background: transparent;
    border: none;
    min-width: auto;
    img {
      width: 20px;
      pointer-events: none;
    }
  }
`;

const SharedContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-y: auto;
  vertical-align: baseline;
  background: transparent;
  padding: 8px 12px;
`;
const UserInfo = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 24px;
  svg,
  img {
    width: 48px;
    height: 48px;
    background-clip: content-box;
    border-radius: 50%;
  }
  span {
    font-weight: 600;
    font-size: 16px;
    line-height: 1.5;
    margin-left: 5px;
  }
`;

const SharedCreations = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 24px 12px 16px;
`;

const AssetButton = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  min-width: auto;
  margin-left: 10px;
  img {
    width: 25px;
    height: 25px;
  }
`;

const AttachAssets = styled.div`
  align-items: center;
  display: flex;
  padding-right: 8px;
  ${AssetButton} {
  }
`;

const ShareComment = styled.div`
  padding-left: 8px;
  margin-right: auto;
  border-left: 1px solid rgba(0, 0, 0, 0.15);
  ${AssetButton} {
    img {
      margin-right: 5px;
    }
    font-size: 14px;
  }
`;

const PostButton = styled.button`
  min-width: 60px;
  border-radius: 20px;
  background-color: ${(props) =>
    props.disabled ? 'rgba(0,0,0,0.8)' : '#0a66c2'};
  color: white;
  padding: 0 16px;
  &:hover {
    background-color: ${(props) =>
      props.disabled ? 'rgba(0,0,0,0.8)' : '#004182'};
    /* background-color: #004182; */
    cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  }
`;

const Editor = styled.div`
  padding: 12px 24px;
  textarea {
    width: 100%;
    min-height: 100px;
    resize: none;
  }

  input {
    width: 100%;
    height: 35px;
    font-size: 16px;
    margin-bottom: 20px;
  }
`;

const UploadImage = styled.div`
  text-align: center;
  img {
    width: 100%;
  }
`;

const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
  };
};

const mapDispatchToProps = (dispatch) => ({
  postArticle: (payload) => dispatch(postArticleAPI(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostModal);
